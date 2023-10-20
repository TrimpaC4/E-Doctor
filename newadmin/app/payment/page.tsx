"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  
  const [amout, setAmount] = useState({});

  const onChange = (e: any) => {
    setAmount({
      ...amout,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    console.log(amout);
    axios
      .post("http://localhost:5000/api/payment/add", amout)
      .then((res) => {
        const { result } = res.data;
        router.push(result.link);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="text" name="amount" onChange={onChange} />
      <input type="button" name="amount" onClick={handlePayment} value="pay" />
    </div>
  );
}

export default Page;
