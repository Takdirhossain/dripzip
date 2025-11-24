{!! BaseHelper::clean(
    trans('core/base::layouts.copyright', [
        'year' => Carbon\Carbon::now()->year,
        'company' => "Banglarshomiron",
        'version' => sprintf('<span class="fw-medium">%s</span>', get_cms_version()),
    ]),
) !!}
