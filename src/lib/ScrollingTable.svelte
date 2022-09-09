<script>
import { onMount } from "svelte";


    export let speed;
    export let data;
    export let headers;
    let scrollTop = 0;
    let tablediv;
    let tablebody;
    let scrolling = false;
    
    const scrollCallback = () => {
        if (tablediv != null && tablebody != null) {
            scrollTop += speed;

            if (scrollTop == 0) {
                scrolling = false;
            } else {
                scrolling = true;

                if (scrollTop >= tablebody.scrollHeight) {
                    scrollTop = 0;
                }

                tablediv.scrollTop = scrollTop;

            }    
        }
        window.requestAnimationFrame(scrollCallback);
    }

    onMount(() => {
        window.requestAnimationFrame(scrollCallback);
        console.log("test")
    })

</script>

<div bind:this={tablediv} id="scrolling-table" class="hide-scrollbar table-responsive" style="height:75vh;overflow:scroll;background:lightgray;">
    <table class="table table-striped">
        <thead style="top:0;position:sticky;background-color:white;">
        <tr>
            <th scope="col">#</th>
            {#each headers as header}
                <th scope="col">{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody bind:this={tablebody} id="body">
            {#each data as values, index}
            <tr>
                <th scope="row">{index}</th>
                {#each values as value}
                    <td>{value}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
        {#if scrolling}
        <br>
        <tbody id="body">
            {#each data as values, index}
            <tr>
                <th scope="row">{index}</th>
                {#each values as value}
                    <td>{value}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
        {/if}
    </table>
</div>