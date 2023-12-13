"use client";

import * as z from "zod";
import axios from "axios";
import { Color } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1).regex(/^#/, {
        message: 'String Must be a valid hex code'
    }),
    hexValue: z.string().optional()
});



type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
    initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [ open, setOpen ] = useState(false);
    const [ loading, setloading ] = useState(false);
    const [value, setValue] = useState('');

    const title = initialData ? "Edit Color" : "Create Color";
    const description = initialData ? "Edit a Color" : "Create Color";
    const toastMessage = initialData ? "Color updated." : "Color created.";
    const action = initialData ? "Save changes" : "Create";
    
    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
            hexValue: '',
        }
    });
    
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hexColor = event.target.value;
        form.setValue('value', hexColor); // Update 'value' field
        form.setValue('hexValue', hexColor); // Update hex value field
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hexColor = event.target.value;
        form.setValue('hexValue', hexColor); // Update hex value field
    };


    const onSubmit = async (data: ColorFormValues) => {
        try {
            setloading(true);
            if (initialData) {
                
            await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
        } else {
            
            await axios.post(`/api/${params.storeId}/colors`, data);
        }
            router.refresh();
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setloading(false);
        }
    };

    const onDelete = async () => {
        try {
            setloading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
            router.refresh();
            router.push(`/${params.storeId}/colors`);
            toast.success("Color deleted.");
        } catch(error) {
            toast.error("Make sure you removed all products using this color.")
        } finally {
            setloading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading 
                title={title}
                description = {description}
                />
                {initialData &&
                <Button 
                variant="destructive"
                size="icon"
                onClick = {() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Color Name" {...field} />
                                    
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-4">
                                        {/* <Input disabled={loading} placeholder="Color value" {...field} type="color" onChange={handleColorChange}/> */}
                                        <Input disabled={loading} {...field}
                                            onChange={(e) => {
                                            field.onChange(e); // Keep the original onChange functionality
                                            handleValueChange(e); // Additional logic to handle the change
                                        }} 
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField 
                        control={form.control}
                        name="hexValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hex Value</FormLabel>
                                <FormControl>
                                    {/* <Input disabled={loading} {...field} /> */}
                                    <Input disabled={loading} {...field} type="color" placeholder={value} onChange={handleColorChange}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>

        </>
    )
}