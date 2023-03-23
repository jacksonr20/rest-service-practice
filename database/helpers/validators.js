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

const userExistsById = async (id) => {
  // Validate if the email exists
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`ID ${id} does not exists`);
  }
};

export { isValidRole, emailExists, userExistsById };
