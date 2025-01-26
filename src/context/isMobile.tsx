import { headers } from "next/headers";
import MobileDetect from "mobile-detect";

export const getIsSsrMobile = async () => {
  const headersList = await headers();

  const md = new MobileDetect(headersList?.get("user-agent") as string);
  return Boolean(md.mobile() || md.tablet());
};
