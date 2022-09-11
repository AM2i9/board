<script>
    import { onMount } from "svelte";

    export let sheet_id;
    export let data;

    let form;
    
    onMount(() => {
        form.elements.sheetid.value = sheet_id || "";
        form.elements.title.value = data.title || "";
        form.elements.heading.value = data.heading || "";
        form.elements.text_align.value = data.text_align;
        form.elements.qr.checked = data.qr;
    });

    const formSubmit = () => {
        let sheet_id = form.elements.sheetid.value;

        let data = {
            title: form.elements.title.value || undefined,
            heading: form.elements.heading.value || undefined,
            text_align: form.elements.text_align.value || undefined,
            qr: form.elements.qr.checked || undefined
        };

        let new_url = `${self.location.origin}/?s=${sheet_id}&c=${btoa(JSON.stringify(data))}`;

        self.location.href = new_url;
    }

</script>

<form bind:this={form} on:submit|preventDefault={formSubmit}>
    <label for="sheetid">Sheet ID (Required)</label><br>
    <input class="form-control" id="sheetid" type="text" required><br>
    
    <label for="title">Title</label><br>
    <input class="form-control" id="title" type="text"><br>

    <label for="heading">Heading</label><br>
    <input class="form-control" id="heading" type="text"><br>

    <label for="text_align">Text Alignment</label><br>

    <input type="radio" id="left" name="text_align" value="left">
    <label for="center">left (default)</label><br>
    
    <input type="radio" id="center" name="text_align" value="center">
    <label for="center">center</label><br>
    
    <input type="radio" id="right" name="text_align" value="right">
    <label for="center">right</label><br>

    <br>

    <input class="form-check-label" id="qr" type="checkbox" name="qr" value="true">
    <label for="qr">Show QR code</label><br>
    
    <br>

    <input class="btn btn-primary" type="submit" value="Save">
</form>