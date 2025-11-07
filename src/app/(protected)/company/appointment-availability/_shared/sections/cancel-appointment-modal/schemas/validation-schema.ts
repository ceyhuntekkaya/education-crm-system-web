import * as Yup from "yup";
import { CancelledByType } from "@/enums";

export const validationSchema = Yup.object({
  cancellationReason: Yup.string()
    .required("İptal nedeni zorunludur")
    .min(10, "İptal nedeni en az 10 karakter olmalıdır")
    .max(500, "İptal nedeni en fazla 500 karakter olabilir"),
  canceledByType: Yup.mixed<CancelledByType>()
    .oneOf(Object.values(CancelledByType))
    .required("İptal eden seçimi zorunludur"),
});
