"use client";
import failStyle from "../fail/fail.module.css";
import { useRouter } from "next/navigation";
import Link from 'next/link';
const Page = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className={failStyle.failPage}>
      <h1>Payment Failed</h1>
      <p>
        An error has occurred during the payment process. Please check the
        validity of the bank information provided.
      </p>
      <p>
        If you continue to experience issues, please contact our customer
        support team and provide the following error code: [404].
      </p>
      <button className={failStyle.return} onClick={goBack}>
        Go back to payment
      </button>
      <Link href="/">
        <button className={failStyle.cancel}>Cancel</button>
      </Link>
    </div>
  );
};

export default Page;
