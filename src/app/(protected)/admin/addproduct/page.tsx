"use client"
import React, { startTransition } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { useForm, useWatch, Control, Controller } from "react-hook-form";
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
import { categories, categoryNames } from '@/app/types';
import { Textarea } from "@/components/ui/textarea"
import { colors } from '@/app/types';
import { Button } from '@/components/ui/button';
import { FormSuccess } from '@/components/form-success';

type Props = {}



const AddProduct = (props: Props) => {

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      category: categoryNames[0],
      color: colors[0],
      price: 0,
      image: "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png",
      stock: 0,
      sizes: [{
        name: "XS",
        stock: 10,
      }], /* EXAMPLE {name: "XS", stock: 24,} */
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isImageActive, setIsImageActive] = useState<boolean>(false);
  const [firstSKU, setFirstSKU] = useState("")
  const [secondSKU, setSecondSKU] = useState("")

  /*  function IsolateFirstSKU({ control }: { control: Control<z.infer<typeof addProductSchema>> }) {
     const firstSKU = useWatch({
       control,
       name: "sku",
       defaultValue: "XXX"
     });
 
   } */
  const onSubmit = (values: z.infer<typeof addProductSchema>) => {
    alert('test')
    setError("");
    setSuccess("");

    startTransition(() => {
      console.log(values)
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


    <Card className='w-full md:w-fit p-6'>
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
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="Image" />
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
                              {categories.map(({ name }) => (
                                <SelectItem {...field} disabled={isPending} key={name} value={name.toLowerCase()}>
                                  {name}
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
                          <Input {...field} disabled={isPending} type='number' placeholder='Price $' />
                        </FormControl>
                        <FormMessage></FormMessage>
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
                          <Input {...field} disabled={isPending} type='number' placeholder='Stock' />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                </div>

              </div>
            </div>
            <br />

            <div className='w-full grid grid-cols-7 gap-3'>

              <div className='col-span-1 flex items-center'>  <FormLabel>SKU :</FormLabel></div>
              <div className='col-span-1 flex items-center'> {/* <IsolateFirstSKU control={control} /> */}</div>
              <div className='col-span-1 flex items-center'>YYY</div>
              <div className='col-span-4'>

                <FormField
                  control={form.control}
                  name='sku'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex'>
                        <FormControl>
                          <Input className='w-16' {...field} disabled={isPending} type='text' placeholder='SKU' />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

            </div>
            <br />
            {/*  <FormSuccess message='Successfully Added' /> */}
            <div>
              <Button className='w-full' type='submit'>SUBMIT</Button>
            </div>
          </form>
        </Form>
        <div onClick={() => setIsImageActive(!isImageActive)}>CLICK ME</div>
      </CardContent>
    </Card>


  )
}

export default AddProduct