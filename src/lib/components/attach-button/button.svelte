<script>
    import Button from "$lib/components/ui/button/button.svelte";
    let files = $state([]);
    let inputElement;

    function openFileDialog() {
        inputElement.click();
    }

    function handleFiles(event) {
        files = [...event.target.files];
        // Можно добавить дополнительную обработку файлов
    }
</script>

<Button onclick={openFileDialog}>
    Прикрепить фотографии
</Button>

<input 
    type="file" 
    multiple 
    accept="image/*" 
    bind:this={inputElement}
    onchange={handleFiles}
    style="display: none;"
>

{#if files.length > 0}
    <div class="preview-container">
        <h3>Выбранные файлы ({files.length}):</h3>
        <ul>
            {#each files as file}
                <li>
                    <img 
                        src={URL.createObjectURL(file)} 
                        alt="Preview" 
                        class="thumbnail"
                        
                    >
                </li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    button {
        padding: 10px 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background: #2980b9;
    }

    .preview-container {
        margin-top: 20px;
    }

    .thumbnail {
        display: block;
        max-width: 150px;
        max-height: 150px;
        margin-top: 5px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
        padding: 10px;
        background: #f8f8f8;
        border-radius: 4px;
    }
</style>