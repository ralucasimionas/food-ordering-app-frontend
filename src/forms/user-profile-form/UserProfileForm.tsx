import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  //email is a read-only field, wont be validated, therefore is optional
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

//z.infer with automatically assign the formSchema properties to UserFormData
type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  //we pass onSave as a prop because we can do all the API stuff at the page level
  //we can pass different functions that can get called when the users submits the form
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    //useForm - the type of our form
    resolver: zodResolver(formSchema),
    //resolver - handles things like validation etc.
    defaultValues: currentUser,
  });

  //if the comp rerenders/the currentUser changes -> the form rerenders based on the new data ( the reset function)
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <div>
          <h2 className="text-2xl font-bold">UserProfile Form</h2>
          <FormDescription>
            View and change your profile information here!
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* field - contains info about the input state eg: error msg, if the user accessed the field etc*/}
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                {/* field - contains info about the input state eg: error msg, if the user accessed the field etc*/}
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  {/* field - contains info about the input state eg: error msg, if the user accessed the field etc*/}
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  {/* field - contains info about the input state eg: error msg, if the user accessed the field etc*/}
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  {/* field - contains info about the input state eg: error msg, if the user accessed the field etc*/}
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Save changes
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
