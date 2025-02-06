import { getCategorie } from "@/api/categorie";
import { types } from "@/types/types";

export const fetchCategorie = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pedingCategorie });

      const { results } = await getCategorie();

      dispatch({ type: types.fulFilledCategorie, payload: results });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedCategorie });
    }
  };
};
