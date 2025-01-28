<?php

class DNB_Deep_Nav_Block
{
    public $includes_path;

    public function __construct()
    {
        $this->includes_path = plugin_dir_path(__FILE__);
        $this->init();
    }

    public function init()
    {
      
        $this->rest();
    }

    public function rest() {
        require_once $this->includes_path . 'rest/dnb-navigation.php';
    }

    
}