import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';
import { calculateDurationInWeeks } from '../../utils/weekCalculator';
import { courseProjection } from './course.constants';

//  save course to db

const CoursePOSTIntoDB = async (payload: TCourse) => {
  const result = (await Course.create(payload)).toObject({
    versionKey: false,
  });
  return result;
};

// get all course from db

const getAllCourseFromDB = async (queryParams: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'startDate',
    sortOrder = 'asc',
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = queryParams;

  // constructing filter object
  const filter: Record<string, unknown> = {};

  if (minPrice !== undefined && maxPrice !== undefined) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (tags) {
    filter['tags.name'] = { $in: Array.isArray(tags) ? tags : [tags] };
  }
  if (startDate) {
    filter.startDate = { $gte: startDate };
  }

  if (endDate) {
    filter.endDate = { $lte: endDate };
  }

  if (language) {
    filter.language = language;
  }
  if (provider) {
    filter.provider = provider;
  }
  if (durationInWeeks) {
    filter.durationInWeeks = durationInWeeks;
  }
  if (level) {
    filter['details.level'] = level;
  }

  // executing query with pagination and sorting

  const result = await Course.find(filter, courseProjection)
    .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  // total count for pagination
  const total = await Course.countDocuments(filter);

  return {
    meta: { page: Number(page), limit: Number(limit), total },
    data: result,
  };
};

// update course by id

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...courseRemainingData } = payload;
  const { startDate, endDate, durationInWeeks } = courseRemainingData;
  const session = await mongoose.startSession();

  // checking if the user is trying to modify the course duration directly

  if (durationInWeeks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't update the course duration directly",
    );
  }

  try {
    session.startTransaction();

    // If startDate/endDate is provided, calculate and update durationInWeeks
    if (startDate && endDate) {
      const calculatedDurationInWeeks = calculateDurationInWeeks(
        startDate,
        endDate,
      );
      courseRemainingData.durationInWeeks = calculatedDurationInWeeks;
    } else if (startDate) {
      // If only startDate is provided, fetch endDate from the database or handle it accordingly
      const dbCourse = await Course.findById(id);
      if (dbCourse && dbCourse.endDate) {
        courseRemainingData.durationInWeeks = calculateDurationInWeeks(
          startDate,
          dbCourse.endDate,
        );
      }
    } else if (endDate) {
      // If only endDate is provided, fetch startDate from the database or handle it accordingly
      const dbCourse = await Course.findById(id);
      if (dbCourse && dbCourse.startDate) {
        courseRemainingData.durationInWeeks = calculateDurationInWeeks(
          dbCourse.startDate,
          endDate,
        );
      }
    }
    // Step 1: Basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // Step 2: Update details if provided
    else if (details) {
      Object.assign(updatedBasicCourseInfo.details, details);
      await updatedBasicCourseInfo.save();
    }

    // Step 3: Updating tags if provided
    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      // Remove deleted tags
      const deletedTagsInCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedTagsInCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // Filter out the new course fields
      const newTags = tags?.filter((el) => el.name && !el.isDeleted);

      // Add new tags
      const newTagsInsertInCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newTagsInsertInCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    // Updated result
    const result = await Course.findById(id);
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

// get a course by id

const getACourseFromDB = async (id: string) => {
  const result = await Course.findById(id, { __v: 0 });
  const reviews = await Review.find({ courseId: id }, { __v: 0, _id: 0 });
  return {
    course: result,
    reviews,
  };
};

// get best course based on average ratting

const getBestCourseBasedOnRatingFromDB = async () => {
  try {
    const bestCourse = await Review.aggregate([
      {
        $group: {
          _id: '$courseId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'courseDetails',
        },
      },
      {
        $unwind: '$courseDetails',
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          'courseDetails.__v': 0,
          _id: 0,
          'courseDetails.tags._id': 0,
          'courseDetails.details._id': 0,
        },
      },
    ]);

    if (bestCourse.length === 0) {
      throw new Error('No courses found.');
    }

    return {
      course: bestCourse[0].courseDetails,
      averageRating: bestCourse[0].averageRating,
      reviewCount: bestCourse[0].reviewCount,
    };
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieve best course',
    );
  }
};

export const CourseServices = {
  CoursePOSTIntoDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
  getACourseFromDB,
  getBestCourseBasedOnRatingFromDB,
};
