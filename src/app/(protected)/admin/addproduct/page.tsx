"use client"
import React, { startTransition } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useState, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addProductSchema } from '@/schemas';
/* import { DropdownMenu } from '@/components/ui/dropdown-menu'; */
import { addProduct } from '@/actions/add-product';
import { categories } from '@/app/types';
import { Textarea } from "@/components/ui/textarea"
import { colors } from '@/app/types';
import { Button } from '@/components/ui/button';

type Props = {}



const AddProduct = (props: Props) => {


  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",/* category: Category, */
      color: "",/* color: "", */
      price: -1,
      image: "",
      stock: -1,
      sizes: [{
        name: "XS",
        stock: 10,
      }], /* EXAMPLE {name: "XS", stock: 24,} */
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isImageActive, setIsImageActive] = useState<boolean>(true);

  const onSubmit = (values: z.infer<typeof addProductSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addProduct(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
        })
        .catch(() => {
          setError("Something went wrong. Please try again later.");
        });
    });
  }
  return (
    <div className='grid grid-cols-5 md:w-[800px] sm:w-[400px] gap-8'>
      <Card className='col-span-1 invisible'>

      </Card>
      <Card className='col-span-3 p-6'>
        <CardHeader>
          <p className="text-xl font-semibold text-center">Add Product</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid-cols-3 gap-4 items-center justify-between">
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder='Product Name' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}>
                </FormField>
                <br />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className='resize-none h-32' {...field} disabled={isPending} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <br />
                <div className='w-full flex justify-between items-center'>
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                {categories.map((category) => (
                                  <SelectItem {...field} disabled={isPending} key={category} value={category.toLowerCase()}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='color'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Color</SelectLabel>
                                {colors.map((color) => (
                                  <SelectItem {...field} disabled={isPending} key={color} value={color.toLowerCase()}>
                                    {color}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <br />
                <div className='grid grid-cols-4 gap-4'>

                  <div className='col-span-2 flex'>
                    <FormField
                      control={form.control}
                      name='price'
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel>Price $</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} type='number' placeholder='Price $' defaultValue={0} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                   
                  </div>
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='stock'
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} type='number' placeholder='Stock' defaultValue={1} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>


                </div>
              </div>
              <br />
              <div>
                <Button onClick={() => setIsImageActive(!isImageActive)} className='w-full'>SUBMIT</Button>
              </div>
            </form>
          </Form>
          <div onClick={() => setIsImageActive(!isImageActive)}>CLICK ME</div>
        </CardContent>
      </Card>
      {isImageActive ? <Card className='col-span-1'>

      </Card> : null}
    </div>
  )
}

export default AddProduct