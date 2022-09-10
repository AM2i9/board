<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load={onChartsLoaded}></script>
</svelte:head>

<script>
    import About from "./About.svelte";
    import ScrollingTable from "./lib/ScrollingTable.svelte";

    const urlParams = new URLSearchParams(window.location.search);
    const sheet_id = urlParams.get("s")

    let table_data = null;

    const onChartsLoaded = () =>{
        if (sheet_id != null) {
            google.charts.load("current", {packages:['corechart']});
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
    {#if sheet_id == null}
        <About />
    {:else}
        {#if table_data != null}
            <ScrollingTable data={table_data.rows} headers={table_data.headers} speed={0.2} />
        {:else}
        <p>No data</p>
        {/if}
    {/if}
</div>