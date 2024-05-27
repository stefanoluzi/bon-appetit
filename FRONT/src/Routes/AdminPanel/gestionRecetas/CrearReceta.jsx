import React, { useEffect, useState } from "react";
import "./CrearReceta.css";
import { fetchCategories, createRecipe } from "../../../api/api";

const CrearReceta = ({ closeModal, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    instrucciones: "",
    categorias: [],
    imagenes: [""],
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Obtener categorías desde la API
    const getCategorias = async () => {
      const data = await fetchCategories();
      if (data) {
        setCategorias(data);
      } else {
        alert("Error al cargar categorías.");
      }
    };
    getCategorias();
  }, []);

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

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.imagenes];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      imagenes: updatedImages,
    });
  };

  const addImageField = () => {
    if (formData.imagenes[formData.imagenes.length - 1].trim() !== "") {
      setFormData({
        ...formData,
        imagenes: [...formData.imagenes, ""],
      });
    }
  };

  const removeImageField = (index) => {
    const updatedImages = formData.imagenes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imagenes: updatedImages,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nombre, descripcion, ingredientes, instrucciones, categorias, imagenes } = formData;

    if (!nombre || !descripcion || !ingredientes || !instrucciones || categorias.length === 0 || imagenes.length === 0) {
      alert("Por favor ingrese todos los campos.");
      return;
    }

    try {
      const receta = {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        categorias: categorias.map((category) => parseInt(category)),
        imagenes: imagenes.filter((image) => image.trim() !== ""),
      };

      const createResponse = await createRecipe(receta);

      if (createResponse.success) {
        alert("Receta creada exitosamente.");
        closeModal();
        fetchRecipes(); // Actualizar la lista de recetas
      } else if (createResponse.error) {
        alert("No se pudo cargar la receta.");
      } else {
        setValidationErrors(createResponse);
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content crear-receta-container">
        <div className="form-wrapper">
          <h2 className="title">Agregar Receta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} />
              <span className="error-text">{validationErrors.nombre}</span>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea className="form-control" name="descripcion" rows="4" value={formData.descripcion} onChange={handleChange} />
              <span className="error-text">{validationErrors.descripcion}</span>
            </div>

            <div className="form-group">
              <label>Ingredientes</label>
              <input className="form-control" name="ingredientes" value={formData.ingredientes} onChange={handleChange} />
              <span className="error-text">{validationErrors.ingredientes}</span>
            </div>

            <div className="form-group">
              <label>Instrucciones</label>
              <textarea className="form-control" name="instrucciones" rows="4" value={formData.instrucciones} onChange={handleChange} />
              <span className="error-text">{validationErrors.instrucciones}</span>
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select className="form-control select-categorias" name="categorias" multiple value={formData.categorias} onChange={handleChange}>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.categorias}
                  </option>
                ))}
              </select>
              <span className="error-text">{validationErrors.categoria}</span>
            </div>

            <div className="form-group">
              <label>Imágenes</label>
              {formData.imagenes.map((imagen, index) => (
                <div key={index} className="image-field">
                  <input className="form-control" name={`imagen-${index}`} value={imagen} onChange={(e) => handleImageChange(index, e.target.value)} />
                  <button type="button" onClick={() => removeImageField(index)}> - </button>
                </div>
              ))}
              <div className="add-image-btn-container">
                <button type="button" className="add-image-btn" onClick={addImageField}> + </button>
              </div>
              <span className="error-text">{validationErrors.imagenes}</span>
            </div>

            <div className="form-actions">
              <button type="button" className="btn cancel-btn" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn submit-btn">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearReceta;
