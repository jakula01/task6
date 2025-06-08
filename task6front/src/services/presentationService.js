import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/presentations`;
export const getPresentationById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Presentation not found");
  }
};

export const getAllPresentations = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch presentations");
  }
};

export const createPresentation = async (title, author) => {
  try {
    const res = await axios.post(API_URL, {
      title,
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // другие нужные поля
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to create presentation");
  }
};
