import { Formik, Form, Field, FormikValues } from 'formik';
import { useCallback, useMemo } from 'react';
import { useCreateProductMutation } from '../../modules/redux/api/productsAPI';
import { validate } from '../../utils/validate';
import { Loader } from '../Loader';
import { IProduct } from '../../modules/redux/types/products';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const initialValue = useMemo(
    () => ({
      title: '',
      brand: '',
      stock: '',
      rating: '',
    }),
    [],
  );
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const disabledColor = useCallback(
    (contdition: boolean) => (contdition ? 'bg-slate-300' : 'bg-blue-400'),
    [isLoading],
  );

  const handleSubmit = useCallback(
    async (values: FormikValues) => {
      await createProduct(values as IProduct);
      navigate(`/`);
    },
    [createProduct],
  );

  return (
    <div className="w-full h-full">
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        {({ errors, touched, isValid }) => (
          <Form className="bg-slate-900 w-1/3 m-auto p-4 rounded flex flex-col gap-3 text-white">
            <div className="flex flex-col flex-1 gap-5">
              <div className="h-[60px]">
                <Field
                  placeholder="Title"
                  className="p-2 text-slate-900 w-full outline-none"
                  name="title"
                  validate={validate.required}
                />
                {errors.title && touched.title && (
                  <div className="text-red-400">{errors.title}</div>
                )}
              </div>

              <div className="h-[60px]">
                <Field
                  placeholder="Brand"
                  className="p-2 text-slate-900 w-full outline-none"
                  name="brand"
                  validate={validate.required}
                />
                {errors.brand && touched.brand && (
                  <div className="text-red-400">{errors.brand}</div>
                )}
              </div>

              <div className="h-[60px]">
                <Field
                  placeholder="Stock"
                  className="p-2 text-slate-900 w-full outline-none"
                  name="stock"
                  validate={validate.required}
                />
                {errors.stock && touched.stock && (
                  <div className="text-red-400">{errors.stock}</div>
                )}
              </div>

              <div className="h-[60px]">
                <Field
                  placeholder="Rating"
                  className="p-2 text-slate-900 w-full outline-none"
                  name="rating"
                  validate={validate.required}
                />
                {errors.rating && touched.rating && (
                  <div className="text-red-400">{errors.rating}</div>
                )}
              </div>
            </div>
            <button
              disabled={isLoading || !isValid}
              className={`${disabledColor(
                !isValid || isLoading,
              )}  p-2 w-full font-medium rounded-xl relative`}
              type="submit">
              {isLoading && (
                <Loader
                  size={'20'}
                  style={{
                    position: 'absolute',
                    right: '25%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              Create product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
