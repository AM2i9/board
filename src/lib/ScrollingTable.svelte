<script>
import { onMount } from "svelte";


    export let speed;
    export let startDelay = 2;
    export let data;
    export let headers;
    let scrollTop = 0;
    let tablediv;
    let tablebody;
    let lnbreak;
    let scrolling = true;
    let scroll_pause = null;
    
    const scrollCallback = () => {
        if (tablediv != null && tablebody != null && lnbreak != null) {
            if (tablebody.clientHeight + 41 < tablediv.clientHeight) {
                scrolling = false;
            } else {
                scrollTop += speed;

                scrolling = true;

                if (scrollTop >= tablebody.scrollHeight + lnbreak.clientHeight) {
                    scrollTop = 0;
                }

                tablediv.scrollTop = scrollTop;
            }    
        }
        window.requestAnimationFrame(scrollCallback);
    }

    const pauseScroll = (e) => {
        scrolling = false;
        clearTimeout(scroll_pause);
        scroll_pause = window.setTimeout(() => {
            scrollTop = tablediv.scrollTop;
            scrolling = true;
        }, (startDelay * 2 )* 1000)
    }

    onMount(() => {
        window.setTimeout(() => window.requestAnimationFrame(scrollCallback), startDelay * 1000);
    })

</script>

<div bind:this={tablediv} on:wheel={pauseScroll} id="scrolling-table" class="hide-scrollbar table-responsive" style="height:75vh;overflow:scroll;">
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
        <br bind:this={lnbreak}>
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