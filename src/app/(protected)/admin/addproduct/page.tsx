import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
/* import { DropdownMenu } from '@/components/ui/dropdown-menu'; */

type Props = {}

const AddProduct = (props: Props) => {
  return (
    <Card>
        <CardHeader>
            <p className="text-2xl font-semibold text-center">Add Product</p>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Add Product</p>
  
            <Input placeholder="Product Name" />
            </div>
        </CardContent>
    </Card>
  )
}

export default AddProduct