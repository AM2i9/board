<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load={onChartsLoaded}></script>
</svelte:head>

<script>
    import About from "./About.svelte";
    import Edit from "./Edit.svelte";
    import ScrollingTable from "./lib/ScrollingTable.svelte";

    import QrCode from "./lib/QRCode.svelte";

    let path = self.location.pathname;

    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1)
    }

    const urlParams = new URLSearchParams(self.location.search);
    const sheet_id = urlParams.get("s");
    const other_data = urlParams.has("c") ? JSON.parse(atob(urlParams.get("c"))) : {};

    let table_data = null;

    const onChartsLoaded = () =>{
        if (sheet_id != null && path == "/") {
            // @ts-ignore
            google.charts.load("current", {packages:['corechart']});
            // @ts-ignore
            google.charts.setOnLoadCallback(() => {
                // @ts-ignore
                let query = new google.visualization.Query(`https://docs.google.com/spreadsheets/d/${sheet_id}/edit`, {sendMethod: 'auto'});
                query.setQuery('SELECT *');
                query.setRefreshInterval(10);
                query.send((resp) => {
                    let data = resp.getDataTable();
                    let num_rows = data.getNumberOfRows();
                    let num_cols = data.getNumberOfColumns();
                    
                    let headers = [];
                    let rows = [];

                    for(let i=0; i < num_cols;i++) {
                        headers.push(data.getColumnLabel(i))
                    }

                    for(let r=0; r < num_rows;r++) {
                        let row = [];
                        for(let c=0; c < num_cols;c++) {
                            row.push(data.getValue(r, c))
                        }
                        rows.push(row);
                    }
                    table_data = {headers: headers, rows: rows};
                })
            })
        }
    }

</script>

<div class="main-container">
    {#if path == "/board"}
        {#if sheet_id == null}
            <About />
        {:else}
            {#if other_data.title}
                <h1 style:text-align={other_data.text_align}>{other_data.title}</h1>
            {/if}
            {#if other_data.heading}
                <h5 style:text-align={other_data.text_align}>{other_data.heading}</h5>
            {/if}
            {#if table_data != null}
                <ScrollingTable data={table_data.rows} headers={table_data.headers} speed={other_data.scroll_disable ? 0 : 0.2} />
            {:else}
            <p>No data</p>
            {/if}
        {/if}
    {:else if path == "/board/edit"}
        <Edit sheet_id={sheet_id} data={other_data}/>
    {/if}
</div>

{#if path == "/board" && sheet_id != null && other_data.qr}
    <QrCode url={`${self.location.origin}/?s=${sheet_id}&c=${(() => {
        let new_data = Object.assign({}, other_data);
        new_data.qr = false;
        new_data.scroll_disable = true;
        return btoa(JSON.stringify(new_data));
    })()}`} />
{/if}