import React from 'react'
import { useEffect, useState } from 'react';
import { ProductsList } from './productsList';
import { ClassificationProducts } from './classificationProducts';
import { formatQueryParamsClassifications } from '../utils/classifications';

function ProductsComponent() {
    const [error, setError] = useState();
    const [isChecked, setIsChecked] = useState(true);
    const [classifications, setClassifications] = useState({});
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const handleOnChangeCheckbox = (value, checked) => {
        setClassifications({
            ...classifications,
            [value]: checked
        });
        setIsChecked(true);
        setPage(1);
    }

    const moreProducts = () => {
        setIsChecked(false);
        setPage(page + 1);
    }

    useEffect(() => {
        const getClassifications = () =>
            fetch('http://localhost:4000/api/v1/classifications')
                .then(res => res.json())
                .then(resClassifications => {
                    const checks = resClassifications.reduce(
                        (current, classification) => {
                            current[classification.nameClassification] = false;
                            return current;
                        },
                        {}
                    )
                    setClassifications(checks)
                })
                .catch(err => setError(err));

        getClassifications();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            const classificationsSelected = [];
            Object.keys(classifications).forEach(key => classifications[key] && classificationsSelected.push(key));
            const queryClassitications = formatQueryParamsClassifications(classificationsSelected);

            return fetch(`http://localhost:4000/api/v1/products?page=${page}${classificationsSelected.length > 0 ? queryClassitications : ''
                }`)
                .then(res => res.json())
                .then(resProducts => {
                    if (isChecked) {
                        setProducts(resProducts);
                    } else {
                        setProducts((prevProducts) => prevProducts.concat(resProducts))
                    }
                })
                .catch(err => setError(err));
        }

        getProducts();
    }, [page, classifications]);

    return (
        <>
            <ClassificationProducts classifications={classifications} handleOnChange={handleOnChangeCheckbox} />
            <ProductsList products={products} />

            {!error &&
                <div className='d-flex justify-content-center' >
                    <button className='btn btn-warning' onClick={() => moreProducts()}>Cargar  mas</button>
                </div>
            }
        </>
    )
}

export default ProductsComponent