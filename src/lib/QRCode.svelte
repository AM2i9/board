<script>
    export let url;

    import QRCode from 'qrcode';
    
    let qr = QRCode.toDataURL(url);
</script>

<style>
    div {
        position:absolute;
        bottom:0;
        right:0;
        max-width: 12vw;
        box-shadow: 1px 1px 8px 1px #969696;
        border-radius: 10px 0px 0px 0px;
        background-color: white;
        text-align: center;
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
    p {
        margin-top: 10px;
        font-size: large;
        margin-bottom: 0px;
    }
</style>

{#await qr}
{:then url}
    <div>
        <p>View on your device:</p>
        <img src={url} />
    </div>
{:catch error}
{/await}