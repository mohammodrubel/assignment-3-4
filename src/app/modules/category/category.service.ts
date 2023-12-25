import { TCategory } from './category.interface';
import { Category } from './category.model';

// create category to db

const CategoryPOSTIntoDB = async (payload: TCategory) => {
  const result = (await Category.create(payload)).toObject({
    versionKey: false,
  });
  return result;
};

// get all categories from db

const getAllCategoriesFromDB = async () => {
  const findCategoriesData = await Category.find({});
  const result = findCategoriesData.map((category) =>
    category.toObject({ versionKey: false }),
  );
  return result;
};

export const CategoryServices = {
  CategoryPOSTIntoDB,
  getAllCategoriesFromDB,
};
