import React, { useEffect, useState } from "react";
import "./CrearReceta.css"; // Importa CrearReceta.css para el estilo
import { fetchCategories, updateRecipe } from "../../../api/api"; // Importa funciones del API

const EditarReceta = ({
  closeModal,
  fetchRecipes,
  recipeId,
  initialRecipe,
}) => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    instrucciones: "",
    categorias: [],
    imagenes: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de éxito

  useEffect(() => {
    // Función para obtener categorías y establecer datos iniciales de la receta
    const initializeForm = async () => {
      await getCategorias();
      if (initialRecipe) {
        setFormData({
          nombre: initialRecipe.nombre || "",
          descripcion: initialRecipe.descripcion || "",
          ingredientes: initialRecipe.ingredientes || "",
          instrucciones: initialRecipe.instrucciones || "",
          categorias: initialRecipe.categorias.map((cat) => cat.id) || [],
          imagenes:
            initialRecipe.imagenes.map((img) => img.urlImg).join(", ") || "",
        });
      }
    };
    initializeForm();
  }, [recipeId, initialRecipe]);

  const getCategorias = async () => {
    // Función asíncrona para obtener las categorías
    const data = await fetchCategories();
    if (data) {
      setCategorias(data);
    } else {
      alert("Error al cargar categorías.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions).map((option) => option.value);
      setFormData({
        ...formData,
        [name]: values,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      categorias,
      imagenes,
    } = formData;

    if (
      !nombre ||
      !descripcion ||
      !ingredientes ||
      !instrucciones ||
      categorias.length === 0 ||
      imagenes.length === 0
    ) {
      alert("Por favor ingrese todos los campos.");
      return;
    }

    const updatedRecipe = {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      categorias: categorias.map((category) => parseInt(category)),
      imagenes: imagenes.split(",").map((image) => image.trim()), // Convertir la cadena de URLs a un array
    };

    const success = await updateRecipe(recipeId, updatedRecipe);
    if (success) {
      fetchRecipes();
      closeModal();
      setShowSuccessMessage(true); // Mostrar el mensaje de éxito
    } else {
      alert("Error al actualizar la receta.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content crear-receta-container">
        <div className="form-wrapper">
          <h2 className="title">Editar Receta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <span className="error-text">{validationErrors.nombre}</span>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
              />
              <span className="error-text">{validationErrors.descripcion}</span>
            </div>

            <div className="form-group">
              <label>Ingredientes</label>
              <input
                className="form-control"
                name="ingredientes"
                value={formData.ingredientes}
                onChange={handleChange}
              />
              <span className="error-text">
                {validationErrors.ingredientes}
              </span>
            </div>

            <div className="form-group">
              <label>Instrucciones</label>
              <textarea
                className="form-control"
                name="instrucciones"
                rows="4"
                value={formData.instrucciones}
                onChange={handleChange}
              />
              <span className="error-text">
                {validationErrors.instrucciones}
              </span>
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select
                className="form-control"
                name="categorias"
                multiple
                value={formData.categorias}
                onChange={handleChange}
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.categorias}
                  </option>
                ))}
              </select>
              <span className="error-text">{validationErrors.categorias}</span>
            </div>

            <div className="form-group">
              <label>Imágenes</label>
              <input
                className="form-control"
                name="imagenes"
                value={formData.imagenes}
                onChange={handleChange}
              />
              <span className="error-text">{validationErrors.imagenes}</span>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button type="submit" className="btn submit-btn">
                Guardar cambios
              </button>
            </div>
          </form>
          {showSuccessMessage && (
            <div className="success-message">
              ¡La receta fue actualizada con éxito!
              <button onClick={() => setShowSuccessMessage(false)}>
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditarReceta;
