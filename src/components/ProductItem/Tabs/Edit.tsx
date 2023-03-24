import { IProduct } from '../../../modules/redux/types/products';
import { Formik, Field, Form, FormikValues } from 'formik';
import { Loader } from '../../Loader';
import { FC, useCallback, useMemo } from 'react';

interface IEdit {
  product: IProduct;
  handleUpdate: (values: FormikValues) => void;
  isLoading: boolean;
}

export const Edit: FC<IEdit> = ({ product, handleUpdate, isLoading }) => {
  const disabledColor = useCallback(
    (contdition: boolean) => (contdition ? 'bg-slate-300' : 'bg-blue-400'),
    [isLoading],
  );
  const initialValues = useMemo(
    () => ({
      title: product.title,
      price: product.price,
      category: product.category,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      description: product.description,
    }),
    [],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}>
      <Form className="w-full flex flex-col flex-1 gap-3">
        <Field
          placeholder="Title"
          className="outline-none p-2 text-slate-900 w-full"
          name="title"
        />
        <Field
          placeholder="Price"
          className="outline-none p-2 text-slate-900 w-full"
          name="price"
        />
        <Field
          placeholder="Category"
          className="outline-none p-2 text-slate-900 w-full"
          name="category"
        />
        <Field
          placeholder="Rating"
          className="outline-none p-2 text-slate-900 w-full"
          name="rating"
        />
        <Field
          placeholder="Stock"
          className="outline-none p-2 text-slate-900 w-full"
          name="stock"
        />
        <Field
          placeholder="Brand"
          className="outline-none p-2 text-slate-900 w-full"
          name="brand"
        />
        <Field
          placeholder="Description"
          className="outline-none p-2 text-slate-900 w-full"
          name="description"
        />
        <button
          disabled={isLoading}
          className={`${disabledColor(
            isLoading,
          )}  p-2 w-full font-medium rounded-xl relative text-white`}
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
          Update product
        </button>
      </Form>
    </Formik>
  );
};
