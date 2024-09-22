// import { z } from 'zod';

// const FacilitySchemaValidation = z.object({
//   body: z.object({
//     name: z.string(),
//     img: z.string(),
//     description: z.string(),
//     pricePerHour: z.number(),
//     location: z.string(),
//     isDeleted: z.boolean(),
//   }),
// });

// const FacilitySchemaUpdateValidation = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     img: z.string().optional(),
//     description: z.string().optional(),
//     pricePerHour: z.number().optional(),
//     location: z.string().optional(),
//     isDeleted: z.boolean().optional(),
//   }),
// });
// export const FacilityValidation = {
//   FacilitySchemaValidation,
//   FacilitySchemaUpdateValidation,
// };

import { z } from 'zod';

const FacilitySchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    img: z.string().min(1, 'image is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    location: z.string().min(1, 'Location is required'),
    isDeleted: z.boolean(),
  }),
});

const FacilitySchemaUpdateValidation = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  pricePerHour: z.number().optional(),
  location: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const FacilityValidation = {
  FacilitySchemaValidation,
  FacilitySchemaUpdateValidation,
};
