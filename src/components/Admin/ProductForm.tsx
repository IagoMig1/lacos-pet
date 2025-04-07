import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Product, createProduct, updateProduct, uploadProductImage, getProductById } from '../../utils/supabase';
import { ImageIcon, Loader2Icon, XIcon } from 'lucide-react';
import { categories } from '../../utils/categories';
import toast from 'react-hot-toast';
export const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'lacos',
    preco: '',
    descricao: '',
    imagem_url: ''
  });
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      const product = await getProductById(parseInt(id));
      if (product) {
        setFormData({
          nome: product.nome,
          categoria: product.categoria,
          preco: product.preco.toString(),
          descricao: product.descricao || '',
          imagem_url: product.imagem_url || ''
        });
        setImagePreview(product.imagem_url || null);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Por favor, selecione uma imagem JPG, PNG ou WebP');
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }
    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    // Upload
    setUploadingImage(true);
    try {
      const imageUrl = await uploadProductImage(file);
      if (imageUrl) {
        setFormData(prev => ({
          ...prev,
          imagem_url: imageUrl
        }));
        toast.success('Imagem carregada com sucesso!');
      } else {
        throw new Error('Falha ao fazer upload da imagem');
      }
    } catch (error) {
      toast.error('Erro ao fazer upload da imagem');
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagem_url) {
      toast.error('Por favor, adicione uma imagem para o produto');
      return;
    }
    setLoading(true);
    try {
      const productData = {
        nome: formData.nome,
        categoria: formData.categoria as Product['categoria'],
        preco: parseFloat(formData.preco),
        descricao: formData.descricao,
        imagem_url: formData.imagem_url
      };
      if (id) {
        await updateProduct(parseInt(id), productData);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await createProduct(productData);
        toast.success('Produto criado com sucesso!');
      }
      navigate('/admin/produtos');
    } catch (err) {
      toast.error('Erro ao salvar produto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      imagem_url: ''
    }));
  };
  return <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {id ? 'Editar Produto' : 'Novo Produto'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Imagem do Produto
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {imagePreview ? <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={removeImage} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                          <XIcon size={16} />
                        </button>
                      </> : uploadingImage ? <Loader2Icon className="w-8 h-8 text-gray-400 animate-spin" /> : <ImageIcon className="w-8 h-8 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <label className="block">
                      <span className="sr-only">Escolher imagem</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} disabled={uploadingImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" />
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      JPG, PNG ou WebP (max. 5MB)
                    </p>
                  </div>
                </div>
              </div>
              {/* Product Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nome do Produto
                </label>
                <input type="text" value={formData.nome} onChange={e => setFormData(prev => ({
                ...prev,
                nome: e.target.value
              }))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" required />
              </div>
              {/* Category */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Categoria
                </label>
                <select value={formData.categoria} onChange={e => setFormData(prev => ({
                ...prev,
                categoria: e.target.value
              }))} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" required>
                  {Object.entries(categories).map(([slug, category]) => <option key={slug} value={slug}>
                      {category.name}
                    </option>)}
                </select>
              </div>
              {/* Price */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Preço
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-600">
                    R$
                  </span>
                  <input type="number" step="0.01" min="0" value={formData.preco} onChange={e => setFormData(prev => ({
                  ...prev,
                  preco: e.target.value
                }))} className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descrição
                </label>
                <textarea value={formData.descricao} onChange={e => setFormData(prev => ({
                ...prev,
                descricao: e.target.value
              }))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" rows={4} />
              </div>
              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => navigate('/admin/produtos')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500" disabled={loading}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading || uploadingImage} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                  {loading && <Loader2Icon className="animate-spin -ml-1 mr-2 h-5 w-5" />}
                  {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>;
};