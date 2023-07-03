import Cow from '../cows/cow.model';
import { CowService } from '../cows/cow.service';
import { IUser } from './user.interface';
import { User } from './user.model';

// get all users
const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find({}).sort({ _id: -1 });
  return users;
};

// get single user
const getSingleUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });
  return user;
};

// update user info
const updateUserById = async (
  id: string,
  updateData: object
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return user;
};

// delete user
const deleteUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete({ _id: id });
  return user;
};

const updateBuyerBudget = async (buyerId: string, cowId: string) => {
  const buyer = await User.findById({ _id: buyerId });
  const cow = await Cow.findById({ _id: cowId });
  if (buyer && cow) {
    const calculatePrice = buyer?.budget - cow?.price;
    const result = await User.findOneAndUpdate(
      { _id: buyerId },
      { budget: calculatePrice },
      {
        new: true,
      }
    );
    return result;
  }
};

const updateSellerIncome = async (cowId: string) => {
  const cow = await CowService.getSingleCowById(cowId);
  if (cow) {
    const seller = await User.findById({ _id: cow.seller._id });
    if (seller) {
      const calculatePrice = seller?.income + cow?.price;
      const result = await User.findOneAndUpdate(
        { _id: seller._id },
        { income: calculatePrice },
        {
          new: true,
        }
      );
      return result;
    }
  }
};

export const UserService = {
  getUsers,
  getSingleUserById,
  updateUserById,
  deleteUserById,
  updateBuyerBudget,
  updateSellerIncome,
};
