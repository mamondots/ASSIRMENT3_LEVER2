import express from 'express';
import { facilityController } from './facility.controller';
import validateRequest from '../../middlewear/validateRequest';
import { FacilityValidation } from './facility.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(FacilityValidation.FacilitySchemaValidation),
  facilityController.createFacility,
);

router.get('/', facilityController.getAllFacility);
router.get('/:facilityID', facilityController.getSingleFacility);
router.put(
  '/:facilityID',
  validateRequest(FacilityValidation.FacilitySchemaUpdateValidation),
  facilityController.updateSingleFacility,
);
router.delete('/:facilityID', facilityController.deleteSingleFacility);

export const facilityRoutes = router;
