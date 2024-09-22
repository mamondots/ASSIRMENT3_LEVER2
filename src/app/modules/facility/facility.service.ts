/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSearchableFields } from './facility.constant';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityInToBD = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilityInToBD = async (query: Record<string, unknown>) => {
  // const result = await Facility.find();
  // return result;

  try {
    const { page = 1, limit = '', search = '', minPrice, maxPrice } = query;

    const queryField: any = {};

    if (search) {
      // search
      queryField.$or = productSearchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      }));
    }

    // filter
    if (minPrice || maxPrice) {
      queryField.pricePerHour = {};
      if (minPrice) queryField.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) queryField.pricePerHour.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const result = await Facility.find(queryField)
      .skip(skip)
      .limit(Number(limit))
      .exec();
    // Total number of documents matching the query
    const total = await Facility.countDocuments(queryField);

    // Meta information for pagination
    const meta = {
      total, // Total number of facilities
      page: Number(page), // Current page
      limit: Number(limit), // Number of items per page
      totalPages: Math.ceil(total / Number(limit)), // Total number of pages
    };

    return { data: result, meta };
  } catch (error) {
    throw new Error('not found');
  }
};

const getSingleFacilityInToBD = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};

const updateSingleFacilityInToBD = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSingleFacilityInToBD = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const facilityServives = {
  createFacilityInToBD,
  getAllFacilityInToBD,
  getSingleFacilityInToBD,
  updateSingleFacilityInToBD,
  deleteSingleFacilityInToBD,
};
