import express from 'express';
import couponRouter from '../api/admin/coupon/couponRouter';
import brandRouter from '../api/admin/brand/brandRouter';
const adminRoutes = express.Router();

adminRoutes.use('/coupons',couponRouter);
adminRoutes.use('/brands',brandRouter)
export default adminRoutes;