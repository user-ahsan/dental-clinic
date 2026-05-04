import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/constants/service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ArrowLeft, Stethoscope } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found - SmileCare Dental" };
  }

  return {
    title: `${service.title} - SmileCare Dental`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        backButtonLabel="Back to Services"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">{service.description}</p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Features */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
              <Card className="bg-white border border-slate-200">
                <CardContent className="p-6 sm:p-8">
                  <ul className="space-y-4" aria-label={`${service.title} features`}>
                    {(service.features || []).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <Card className="bg-blue-50 border border-blue-200 sticky top-24">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-5">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Ready to Book?
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Schedule your {service.title.toLowerCase()} appointment today with our expert team.
                  </p>
                  <Link href={`/booking?service=${service.slug}`}>
                    <Button variant="default" size="lg" className="w-full">
                      Book Appointment
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency CTA — shown only for non-emergency services */}
      {service.slug !== "emergency" && (
        <section className="py-16 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Dental Emergency?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              If you&apos;re experiencing a dental emergency, we offer same-day appointments for
              urgent care.
            </p>
            <Link href="/services/emergency">
              <Button variant="destructive" size="lg">
                Emergency Care
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
