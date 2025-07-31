<script>
  let { tbar, lbar, rbar, bbar, children } = $props();
</script>

<div class="panel">
  {#if tbar}
    <div class="tbar">
      {@render tbar()}
    </div>
  {/if}
  <div class="middle">
    {#if lbar}
      <div class="lbar">
        {@render lbar()}
      </div>
    {/if}

    <div class="content overflow-y-auto">
      {@render children()}
    </div>

    {#if rbar}
      <div class="rbar">
        {@render rbar()}
      </div>
    {/if}
  </div>
  {#if bbar}
    <div class="bbar">
      {@render bbar()}
    </div>
  {/if}
</div>

<style>
    .panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        background: white;
    }
    
    .tbar, .bbar {
        padding: 10px;
        background: #f5f5f5;
        border-bottom: 1px solid #eee;
        display: flex;
        gap: 8px;
    }
    
    .bbar {
        border-top: 1px solid #eee;
        border-bottom: none;
    }
    
    .middle {
        display: flex;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: scroll;
    }
    
    .lbar, .rbar {
        padding: 10px;
        background: #f9f9f9;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .lbar {
        border-right: 1px solid #eee;
    }
    
    .rbar {
        border-left: 1px solid #eee;
    }
    
    .content {
        flex: 1;
        padding: 15px;
        overflow: auto;
    }
</style>