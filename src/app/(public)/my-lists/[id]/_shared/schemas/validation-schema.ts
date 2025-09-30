import * as yup from "yup";
import { listOptions } from "../mock";

// Liste seçeneklerinin value'larını al
const validListValues = listOptions.map((option) => option.value);

export const validationSchema = yup.object({
  selectedList: yup
    .string()
    .oneOf(validListValues, "Geçerli bir liste türü seçin")
    .required("Liste türü seçimi zorunludur"),
});
