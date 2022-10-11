import type { NextPageWithLayout, UpdateProfileInput } from '@/types';
import type { SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import DashboardLayout from '@/layouts/_dashboard';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import { ReactPhone } from '@/components/ui/forms/phone-input';
import Button from '@/components/ui/button';
import client from '@/data/client';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useMe } from '@/data/user';
import pick from 'lodash/pick';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import * as yup from 'yup';

const profileValidationSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  profile: yup.object().shape({
    id: yup.string().required(),
    bio: yup.string(),
    contact: yup.string(),
    avatar: yup
      .object()
      .shape({
        id: yup.string(),
        thumbnail: yup.string(),
        original: yup.string(),
      })
      .optional()
      .nullable(),
  }),
});
const ProfilePage: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const { me } = useMe();
  const { mutate, isLoading } = useMutation(client.users.update, {
    onSuccess: () => {
      toast.success(<b>Information successfully updated!</b>, {
        className: '-mt-10 xs:mt-0',
      });
    },
    onError: (error) => {
      toast.error(<b>Something went wrong!</b>, {
        className: '-mt-10 xs:mt-0',
      });
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS_ME);
    },
  });

  return (
    <motion.div
      variants={fadeInBottom()}
      className="flex min-h-full flex-grow flex-col"
    >
      <h1 className="mb-5 text-15px font-medium text-dark dark:text-light sm:mb-6">
        Personal Information
      </h1>
      <Form<UpdateProfileInput>
        useFormProps={{
          defaultValues: pick(me, [
            'id',
            'name',
            'email',
            'profile.id',
            'profile.contact',
            'profile.bio',
            'profile.avatar',
            'profile.casino.USD.player_id',
            'profile.casino.USD.money_format',
            'profile.casino.USD.currency',
            'profile.casino.EUR.player_id',
            'profile.casino.EUR.money_format',
            'profile.casino.EUR.currency',
          ]),
        }}
        validationSchema={profileValidationSchema}
        className="flex flex-grow flex-col"
      >
        {({ register, reset, control, formState: { errors } }) => (
          <>
            <fieldset className="mb-6 grid gap-5 pb-5 sm:grid-cols-2 md:pb-9 lg:mb-8">
              <Input
                label="Name"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Email"
                {...register('email')}
              />
              <Input
                label={'Player ID ' + me.profile.casino.USD.currency}
                {...register('profile.casino.USD.player_id')}
              />
            <Input
                label={'Balance ' + me.profile.casino.USD.currency}
                {...register('profile.casino.USD.money_format')}
              />
              <Input
                label={'Player ID ' + me.profile.casino.EUR.currency}
                {...register('profile.casino.EUR.player_id')}
              />
            <Input
                label={'Balance ' + me.profile.casino.EUR.currency}
                {...register('profile.casino.EUR.money_format')}
              />

            </fieldset>
          </>
        )}
      </Form>
    </motion.div>
  );
};

ProfilePage.authorization = true;
ProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfilePage;