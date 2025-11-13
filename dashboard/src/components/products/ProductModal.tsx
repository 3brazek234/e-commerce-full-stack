import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/dummyData"; // تأكد من المسار
import { useToast } from "@/hooks/use-toast";

import useProducts from "@/hooks/useProducts"; // تأكد من المسار
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // 🚨🚨
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; 
import { ControlledInput } from "../ControlledInput";
import productValidation from "../../validation/productValidation";
// 🚨🚨 تعريف الـ FormData Type بناءً على Zod Schema
type ProductFormData = z.infer<typeof productValidation>;

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ open, onOpenChange }: ProductModalProps) {
  const { toast } = useToast();
  const { addProduct } = useProducts(); // 🚨🚨 Destructure addProduct
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productValidation),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "0",
      stock: "0",
      image: null,
    },
  });

  const onSubmit = async (values: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("price", values.price.toString()); 
      formData.append("stock", values.stock.toString()); 
      formData.append("image", values.image); 

      await addProduct(formData); 

      toast({
        title: "Product Added",
        description: "The product has been added successfully.",
      });

      onOpenChange(false); 
      form.reset(); 
    } catch (error) {
      console.error("Failed to add product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>  
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <ControlledInput
                control={form.control}
                name="name"
                label="Product Name"
                placeholder="Enter product name"
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <ControlledInput
              control={form.control}
              name="image"
              label="Product Image"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
            />

                <ControlledInput
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter product description"
              textarea
              rows={3}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <ControlledInput
                control={form.control}
                name="price"
                label="Price ($)"
                type="number"
                step="0.01"
                placeholder="0.00"
              />

              {/* Stock Quantity باستخدام ControlledInput */}
              <ControlledInput
                control={form.control}
                name="stock"
                label="Stock Quantity"
                type="number"
                placeholder="0"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
