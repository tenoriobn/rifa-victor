import { Editor } from '@tinymce/tinymce-react';
import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';

export default function DescricaoProduto() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>DESCRIÇÃO DO PRODUTO</h3>

      <Editor
        name="description_product"
        apiKey='40xu8zv1549i0ig5gbj2fwf9hyt3oimxokfyyur05fkls459'
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue={formState.description_product} // Use o valor do estado atual como valor inicial
        onEditorChange={(content) => handleChange({ target: { name: 'description_product', value: content } })} // Atualiza o estado usando handleChange
      />
    </div>
  );
}
