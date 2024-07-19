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
import { categories, categoryNames, colorNames } from '@/app/types';
import { Textarea } from "@/components/ui/textarea"
import { colors } from '@/app/types';
import { Button } from '@/components/ui/button';
import { FormSuccess } from '@/components/form-success';

type Props = {}



const AddProduct = (props: Props) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      category: categoryNames[0],
      color: colorNames[0],
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
  const [categorySKU, setCategorySKU] = useState("")
  const [colorSKU, setColorSKU] = useState("")

  const onSubmit = (values: z.infer<typeof addProductSchema>) => {
    alert('test')
    setError("");
    setSuccess("");
    console.log(values)
    startTransition(() => {
      console.log(values)
      addProduct(values)
        .then((data) => {
          if (data?.error) {
            //form.reset();
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
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="grid-cols-3 gap-4 items-center justify-between">

            <Input {...register("name")} disabled={isPending} placeholder='Product Name' />
            {errors.description && <p>{errors.name?.message}</p>}
            <br />

            <Textarea className='resize-none h-32' {...register("description")} disabled={isPending} placeholder="Description" />
            {errors.description && <p>{errors.description?.message}</p>}
            <br />

            <Input {...register("image")} disabled={isPending} placeholder="Image" />
            {errors.description && <p>{errors.image?.message}</p>}
            <br />
            <div className='w-full flex justify-between items-center'>

              <Select onValueChange={(value) => setCategorySKU(value)}>
                <SelectTrigger>
                  <SelectValue {...register("category")} placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map(({ name, sku }) => (
                      <SelectItem disabled={isPending} key={sku} value={sku}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setColorSKU(value)}>
                <SelectTrigger>
                  <SelectValue {...register("color")} placeholder="Select a Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Color</SelectLabel>
                    {colors.map(({ name, sku }) => (
                      <SelectItem disabled={isPending} key={sku} value={sku}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
            <br />
            <div className='grid grid-cols-4 gap-4'>

              <div className='col-span-2 flex'>


                <Input {...register("price")} disabled={isPending} type='number' placeholder='Price $' />



              </div>
              <div className='col-span-2'>


                <Input {...register("stock")} disabled={isPending} type='number' placeholder='Stock' />

              </div>

            </div>
          </div>
          <br />

          <div className='w-full grid grid-cols-12'>

            <div className='col-span-2 flex items-center'>  SKU: </div>
            <div className='col-span-1 flex items-center'> {categorySKU ? categorySKU : 'XXX'}</div>
            <div className='col-span-1 text-2xl flex items-center justify-center'>-</div>
            <div className='col-span-1 flex items-center'>{colorSKU ? colorSKU : 'YYY'}</div>
            <div className='col-span-1 text-2xl flex items-center justify-center'>-</div>
            <div className='col-span-6'>

              <Input className='w-16' {...register("sku")} disabled={isPending} type='text' placeholder='SKU' />

            </div>

          </div>
          <br />
          <div>
            <Button className='w-full' type='submit'>SUBMIT</Button>
          </div>

        </form>
        <div onClick={() => setIsImageActive(!isImageActive)}>CLICK ME</div>
      </CardContent>
    </Card>


  )
}

export default AddProduct