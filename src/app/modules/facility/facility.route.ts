import express from 'express';
import { facilityController } from './facility.controller';
// import validateRequest from '../../middlewear/validateRequest';
// import { FacilityValidation } from './facility.validation';
// import auth from '../../middlewear/auth/auth';

const router = express.Router();

router.post(
  '/create_facility',
  // // auth('admin'),
  // validateRequest(FacilityValidation.FacilitySchemaValidation),
  facilityController.createFacility,
);

router.get('/', facilityController.getAllFacility);
router.get('/:facilityID', facilityController.getSingleFacility);
// router.get('/:facilityID', auth('admin'), facilityController.getSingleFacility);
router.put(
  '/:facilityID',
  // auth('admin'),
  // validateRequest(FacilityValidation.FacilitySchemaUpdateValidation),
  facilityController.updateSingleFacility,
);
router.delete(
  '/:facilityID',
  // auth('admin'),
  facilityController.deleteSingleFacility,
);

export const facilityRoutes = router;
