{% extends '_layout.swig' %}
{% import '_macro/post-collapse.swig' as post_template %}
{% import '_macro/sidebar.swig' as sidebar_template %}

{% block title %} {{ __('title.tag') }}: {{ page.tag }} | {{ config.title }} {% endblock %}

{% block content %}



{% endblock %}

{% block sidebar %}
    {{ sidebar_template.render(false) }}
{% endblock %}
