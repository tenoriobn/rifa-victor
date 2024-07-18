import { Editor } from '@tinymce/tinymce-react';
import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';

export default function DescricaoSorteio() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>DESCRIÇÃO DO SORTEIO</h3>

      <Editor
        name="description_sortition"
        apiKey='40xu8zv1549i0ig5gbj2fwf9hyt3oimxokfyyur05fkls459'
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          menu: {
            file: { title: 'Arquivo', items: 'newdocument restoredraft | preview | print ' },
            edit: { title: 'Editar', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            view: { title: 'Visualizar', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
            insert: { title: 'Inserir', items: 'image link media inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
            format: { title: 'Formatar', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats align | removeformat' },
            tools: { title: 'Ferramentas', items: 'spellchecker spellcheckerlanguage | code wordcount' },
            table: { title: 'Tabela', items: 'inserttable | cell row column | tableprops deletetable' },
            help: { title: 'Ajuda', items: 'help' }
          },
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        value={formState.description_sortition} // Use o valor do estado atual como valor inicial
        onEditorChange={(content) => handleChange({ target: { name: 'description_sortition', value: content } })} // Atualiza o estado usando handleChange
      />
    </div>
  );
}
