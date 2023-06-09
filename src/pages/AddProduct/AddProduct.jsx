import React from 'react';
import { menuData } from '../../utils/menuData';
import { useForm } from 'react-hook-form';
import instance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

import "./AddProduct.scss";

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    mode: "onBlur"
  })

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      calories: data.protein * 4 + data.fats * 9 + data.carbohydrates * 4
    }

    instance.post("/products", newProduct)
      .then(res => navigate("/"))
      .catch(err => console.log(err.message))
  }

  return (
    <div className="addProduct">
      <div className="container">
        <div className="addProduct__content">
          <form className="form" onSubmit={handleSubmit(handleAddProduct)} noValidate>
            <h2 className="form__title">Добавление продукта</h2>

            <label className="form__label" htmlFor="">
              <span className="form__label-title">Название</span>
              <input {...register("title", {
                required: true
              })} className="form__field" type="text" placeholder="Введите название" />
            </label>

            <label className="form__label" htmlFor="">
              <span className="form__label-title">Картинка</span>
              <input {...register("image", {
                required: true
              })} className="form__field" type="text" placeholder="Введите ссылку" />
            </label>

            <label className="form__label" htmlFor="">
              <span className="form__label-title">Описание</span>
              <input {...register("description", {
                required: true
              })} className="form__field" type="text" placeholder="Введите описание" />
            </label>

            <div className="form__block">
              <label className="form__label" htmlFor="">
                <span className="form__label-title">Цена</span>
                <input {...register("price", {
                  required: true
                })} defaultValue="0" className="form__field" type="number" />
              </label>

              <label className="form__label" htmlFor="">
                <span className="form__label-title">Вес</span>
                <input {...register("weight", {
                  required: true
                })} defaultValue="0" className="form__field" type="number" />
              </label>
            </div>

            <div className="form__block">
              <label className="form__label" htmlFor="">
                <span className="form__label-title">Белки</span>
                <input {...register("protein", {
                  required: true
                })} defaultValue="0" className="form__field" type="number" />
              </label>

              <label className="form__label" htmlFor="">
                <span className="form__label-title">Жиры</span>
                <input {...register("fats", {
                  required: true
                })} defaultValue="0" className="form__field" type="number" />
              </label>

              <label className="form__label" htmlFor="">
                <span className="form__label-title">Углеводы</span>
                <input {...register("carbohydrates", {
                  required: true
                })} defaultValue="0" className="form__field" type="number" />
              </label>
            </div>

            <label className="form__label" htmlFor="" >
              <span className="form__label-title">Категория</span>
              <select {...register("categories", {
                required: true
              })} className="form__select">
                <option disabled value="">Выберите категорию</option>
                {
                  menuData.map(item => (
                    <option className="form__select-option" key={item.en} value={item.en}>{item.ru}</option>
                  ))
                }
              </select>
            </label>

            <button className="form__btn" type="submit" >Создать продукт</button>

          </form>
        </div>
      </div>
    </div>
  )
};

export default AddProduct;