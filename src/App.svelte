<svelte:head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"on:load={onChartsLoaded}></script>
</svelte:head>

<script>
    import ScrollingTable from "./lib/ScrollingTable.svelte";


    let headers = [];
    let rows = [];

    let num_rows = 0;
    let num_cols = 0;

    let done = false;

    const onChartsLoaded = () =>{
        google.charts.load("current", {packages:['corechart']});
        google.charts.setOnLoadCallback(() => {
                    // @ts-ignore
            let query = new google.visualization.Query('', {sendMethod: 'auto'});
            query.setQuery('SELECT *');
            query.send((resp) => {
                let data = resp.getDataTable();
                num_rows = data.getNumberOfRows();
                num_cols = data.getNumberOfColumns();

                for(let i=0; i<num_cols;i++) {
                    headers.push(data.getColumnLabel(i))
                }

                for(let r=0; r<num_rows;r++) {
                    let row = [];
                    for(let c=0; c<num_cols;c++) {
                        row.push(data.getValue(r, c))
                    }
                    rows.push(row);
                }
                done = true;
            })
        })
    }
</script>
<div style="width:50%">
    {#if done}
    <ScrollingTable data={rows} headers={headers} speed={0.2} />
    {/if}
</div>