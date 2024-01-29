import { UserService } from '../services/index.js';

export const getUsers = async (req, res) => {
  const result = await UserService.getUsers();

  return res.json({ status: 'success', payload: result });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);

  return res.json({ status: 'success', payload: result });
};

export const register = async (req, res) => {
  const user = req.body;

  const result = await UserService.register(user);
  return res.json({ status: 'success', payload: result });
};
