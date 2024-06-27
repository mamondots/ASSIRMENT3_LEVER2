import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityInToBD = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilityInToBD = async () => {
  const result = await Facility.find();
  return result;
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
