import { Role } from '../../models/role.js';
import { User } from '../../models/user.js';

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role: ${role} is not valid`);
  }
};

const emailExists = async (email = '') => {
  // Validate if the email exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error('The email already exists');
  }
};

export { isValidRole, emailExists };
