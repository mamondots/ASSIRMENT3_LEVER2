import { Request, Response } from 'express';
import catchAsync from '../../utilites/catchAsync';
import { facilityServives } from './facility.service';
import sendResponse from '../../utilites/sendResponse';
import httpStatus from 'http-status';

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const facility = req.body;
  const result = await facilityServives.createFacilityInToBD(facility);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const getAllFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await facilityServives.getAllFacilityInToBD();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

const getSingleFacility = catchAsync(async (req: Request, res: Response) => {
  const { facilityID } = req.params;
  const result = await facilityServives.getSingleFacilityInToBD(facilityID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'find single ficility',
    data: result,
  });
});

const updateSingleFacility = catchAsync(async (req: Request, res: Response) => {
  const { facilityID } = req.params;
  const updateFacility = req.body;
  const result = await facilityServives.updateSingleFacilityInToBD(
    facilityID,
    updateFacility,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});

const deleteSingleFacility = catchAsync(async (req: Request, res: Response) => {
  const { facilityID } = req.params;
  const result = await facilityServives.deleteSingleFacilityInToBD(facilityID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const facilityController = {
  createFacility,
  getAllFacility,
  getSingleFacility,
  updateSingleFacility,
  deleteSingleFacility,
};
