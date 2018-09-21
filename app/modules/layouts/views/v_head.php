<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-38967746-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-38967746-2');
</script>
   <?php define("VERSION", "2.0.0"); ?>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo (isset($title)) ? $title . ' | CAS' : ' CEDULA Application System'; ?></title>
    <link rel="icon" href="<?php echo base_url('build/images/logo.png'); ?>">
    <link href="<?php echo base_url('vendors/bootstrap/dist/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link href="<?php //echo base_url('vendors/bootstrap/dist/css/bootstrap-extend.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/nprogress/nprogress.min.css'); ?>" rel="stylesheet">


    <link rel="stylesheet" href="<?php echo base_url('vendors/pdatatables/jquery.dataTables.min.css'); ?>">

    <link href="<?php echo base_url('vendors/pnotify/dist/pnotify.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/pnotify/dist/pnotify.buttons.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/formvalidation/formValidation.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/select2/dist/css/select2.css'); ?>" rel="stylesheet">

    <link href="<?php echo base_url('vendors/bootstrap-datepicker-master/dist/css/bootstrap-datepicker.min.css'); ?>" rel="stylesheet">

    <link href="<?php echo base_url('vendors/easyautocomplete/easy-autocomplete.min.css'); ?>" rel="stylesheet">

    <link href="<?php echo base_url('vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css'); ?>" rel="stylesheet"/>
    <link href="<?php echo base_url('build/css/custom.css?v='.VERSION); ?>" rel="stylesheet">
    <link href="<?php echo base_url('build/css/styles.css?v='.VERSION); ?>" rel="stylesheet">
    <link href="<?php echo base_url('build/css/postfeedlayout.css?v='.VERSION); ?>" rel="stylesheet">
    <link href="<?php echo base_url('build/css/cedulalayout.css?v='.VERSION); ?>" rel="stylesheet">
  </head>
  <body class="nav-sm"  >
    <div class="container body">
      <div class="main_container">
