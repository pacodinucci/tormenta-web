"use server";

import db from "@/lib/db";

export interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export async function createCustomer(data: CustomerData) {
  const existing = await db.customer.findUnique({
    where: { email: data.email },
  });

  if (existing) return existing;

  const customer = await db.customer.create({
    data: {
      id: data.id,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      address: `${data.address}, ${data.city}, ${data.state}`,
      zipCode: data.zip,
    },
  });

  return customer;
}
