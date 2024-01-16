import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  // try {
  //    validationResult(req).errors;
  //   return next();
  // } catch (err) {
  //   res.status(400).send({ errors: err.array() });
  // }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  next()
};
export default validateResult;
