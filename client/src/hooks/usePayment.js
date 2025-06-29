import { toast } from "react-toastify";
import http from "../api/http";

const usePayment = () => {
  const handleCreatePayment = async (currency, packageId, paymentMethod) => {
    try {
      const response = await http.post("/payment/create", {
        currency,
        packageId,
        paymentMethod
      });
      if (response.status === 200) {
        window.location.href = response.data.metadata.paymentUrl;
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Có lỗi xảy ra");
    }
  };

  return {
    handleCreatePayment,
  };
};

export default usePayment;
